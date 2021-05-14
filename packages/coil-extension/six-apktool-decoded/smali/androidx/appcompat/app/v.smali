.class Landroidx/appcompat/app/v;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/app/x;->b(La/a/c/b$a;)La/a/c/b;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/x;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/x;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 4

    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object v1, v0, Landroidx/appcompat/app/x;->r:Landroid/widget/PopupWindow;

    iget-object v0, v0, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/4 v2, 0x0

    const/16 v3, 0x37

    invoke-virtual {v1, v0, v3, v2, v2}, Landroid/widget/PopupWindow;->showAtLocation(Landroid/view/View;III)V

    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    invoke-virtual {v0}, Landroidx/appcompat/app/x;->l()V

    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    invoke-virtual {v0}, Landroidx/appcompat/app/x;->s()Z

    move-result v0

    const/high16 v1, 0x3f800000    # 1.0f

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object v0, v0, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/4 v2, 0x0

    invoke-virtual {v0, v2}, Landroid/view/ViewGroup;->setAlpha(F)V

    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object v2, v0, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-static {v2}, La/g/i/s;->a(Landroid/view/View;)La/g/i/y;

    move-result-object v2

    invoke-virtual {v2, v1}, La/g/i/y;->a(F)La/g/i/y;

    iput-object v2, v0, Landroidx/appcompat/app/x;->t:La/g/i/y;

    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object v0, v0, Landroidx/appcompat/app/x;->t:La/g/i/y;

    new-instance v1, Landroidx/appcompat/app/u;

    invoke-direct {v1, p0}, Landroidx/appcompat/app/u;-><init>(Landroidx/appcompat/app/v;)V

    invoke-virtual {v0, v1}, La/g/i/y;->a(La/g/i/z;)La/g/i/y;

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object v0, v0, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0, v1}, Landroid/view/ViewGroup;->setAlpha(F)V

    iget-object v0, p0, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object v0, v0, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0, v2}, Landroidx/appcompat/widget/ActionBarContextView;->setVisibility(I)V

    :goto_0
    return-void
.end method
