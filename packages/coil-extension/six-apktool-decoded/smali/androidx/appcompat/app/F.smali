.class Landroidx/appcompat/app/F;
.super La/g/i/A;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/I;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/I;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/I;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/F;->a:Landroidx/appcompat/app/I;

    invoke-direct {p0}, La/g/i/A;-><init>()V

    return-void
.end method


# virtual methods
.method public b(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/app/F;->a:Landroidx/appcompat/app/I;

    iget-boolean v0, p1, Landroidx/appcompat/app/I;->w:Z

    if-eqz v0, :cond_0

    iget-object p1, p1, Landroidx/appcompat/app/I;->k:Landroid/view/View;

    if-eqz p1, :cond_0

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroid/view/View;->setTranslationY(F)V

    iget-object p1, p0, Landroidx/appcompat/app/F;->a:Landroidx/appcompat/app/I;

    iget-object p1, p1, Landroidx/appcompat/app/I;->h:Landroidx/appcompat/widget/ActionBarContainer;

    invoke-virtual {p1, v0}, Landroid/widget/FrameLayout;->setTranslationY(F)V

    :cond_0
    iget-object p1, p0, Landroidx/appcompat/app/F;->a:Landroidx/appcompat/app/I;

    iget-object p1, p1, Landroidx/appcompat/app/I;->h:Landroidx/appcompat/widget/ActionBarContainer;

    const/16 v0, 0x8

    invoke-virtual {p1, v0}, Landroidx/appcompat/widget/ActionBarContainer;->setVisibility(I)V

    iget-object p1, p0, Landroidx/appcompat/app/F;->a:Landroidx/appcompat/app/I;

    iget-object p1, p1, Landroidx/appcompat/app/I;->h:Landroidx/appcompat/widget/ActionBarContainer;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroidx/appcompat/widget/ActionBarContainer;->setTransitioning(Z)V

    iget-object p1, p0, Landroidx/appcompat/app/F;->a:Landroidx/appcompat/app/I;

    const/4 v0, 0x0

    iput-object v0, p1, Landroidx/appcompat/app/I;->B:La/a/c/i;

    invoke-virtual {p1}, Landroidx/appcompat/app/I;->l()V

    iget-object p1, p0, Landroidx/appcompat/app/F;->a:Landroidx/appcompat/app/I;

    iget-object p1, p1, Landroidx/appcompat/app/I;->g:Landroidx/appcompat/widget/ActionBarOverlayLayout;

    if-eqz p1, :cond_1

    invoke-static {p1}, La/g/i/s;->A(Landroid/view/View;)V

    :cond_1
    return-void
.end method
