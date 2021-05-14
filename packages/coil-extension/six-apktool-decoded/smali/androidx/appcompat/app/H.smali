.class Landroidx/appcompat/app/H;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/g/i/B;


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

    iput-object p1, p0, Landroidx/appcompat/app/H;->a:Landroidx/appcompat/app/I;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/view/View;)V
    .locals 0

    iget-object p1, p0, Landroidx/appcompat/app/H;->a:Landroidx/appcompat/app/I;

    iget-object p1, p1, Landroidx/appcompat/app/I;->h:Landroidx/appcompat/widget/ActionBarContainer;

    invoke-virtual {p1}, Landroid/widget/FrameLayout;->getParent()Landroid/view/ViewParent;

    move-result-object p1

    check-cast p1, Landroid/view/View;

    invoke-virtual {p1}, Landroid/view/View;->invalidate()V

    return-void
.end method
