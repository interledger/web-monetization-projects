.class Landroidx/appcompat/widget/E;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroid/view/ViewTreeObserver$OnGlobalLayoutListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/widget/C$b;->c()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/widget/C$b;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/C$b;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/E;->a:Landroidx/appcompat/widget/C$b;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onGlobalLayout()V
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/widget/E;->a:Landroidx/appcompat/widget/C$b;

    iget-object v1, v0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-virtual {v0, v1}, Landroidx/appcompat/widget/C$b;->b(Landroid/view/View;)Z

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/E;->a:Landroidx/appcompat/widget/C$b;

    invoke-virtual {v0}, Landroidx/appcompat/widget/U;->dismiss()V

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/E;->a:Landroidx/appcompat/widget/C$b;

    invoke-virtual {v0}, Landroidx/appcompat/widget/C$b;->l()V

    iget-object v0, p0, Landroidx/appcompat/widget/E;->a:Landroidx/appcompat/widget/C$b;

    invoke-static {v0}, Landroidx/appcompat/widget/C$b;->a(Landroidx/appcompat/widget/C$b;)V

    :goto_0
    return-void
.end method
