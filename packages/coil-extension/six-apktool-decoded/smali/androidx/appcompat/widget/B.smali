.class Landroidx/appcompat/widget/B;
.super Landroidx/appcompat/widget/P;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/widget/C;-><init>(Landroid/content/Context;Landroid/util/AttributeSet;IILandroid/content/res/Resources$Theme;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic j:Landroidx/appcompat/widget/C$b;

.field final synthetic k:Landroidx/appcompat/widget/C;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/C;Landroid/view/View;Landroidx/appcompat/widget/C$b;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/B;->k:Landroidx/appcompat/widget/C;

    iput-object p3, p0, Landroidx/appcompat/widget/B;->j:Landroidx/appcompat/widget/C$b;

    invoke-direct {p0, p2}, Landroidx/appcompat/widget/P;-><init>(Landroid/view/View;)V

    return-void
.end method


# virtual methods
.method public a()Landroidx/appcompat/view/menu/z;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/B;->j:Landroidx/appcompat/widget/C$b;

    return-object v0
.end method

.method public b()Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/B;->k:Landroidx/appcompat/widget/C;

    iget-object v0, v0, Landroidx/appcompat/widget/C;->g:Landroidx/appcompat/widget/C$b;

    invoke-virtual {v0}, Landroidx/appcompat/widget/U;->b()Z

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/B;->k:Landroidx/appcompat/widget/C;

    iget-object v0, v0, Landroidx/appcompat/widget/C;->g:Landroidx/appcompat/widget/C$b;

    invoke-virtual {v0}, Landroidx/appcompat/widget/C$b;->c()V

    :cond_0
    const/4 v0, 0x1

    return v0
.end method
